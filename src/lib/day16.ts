type Packet = {
  version: number;
  type: number;
};

type LiteralPacket = Packet & {
  value: number;
};

type OperatorPacket = Packet & {
  length: number;
  lengthType: number;
  subPackets: Array<Packet>;
};

type Bin = '0' | '1';

export function hex2binary(input: string): Array<Bin> {
  const binArr: Array<Bin> = [];
  input
    .split('')
    .map((e) => parseInt(e, 16).toString(2).padStart(4, '0').slice(-4))
    .forEach((e) => {
      e.split('').forEach((b) => binArr.push(b as Bin));
    });
  return binArr;
}

export function getPacketHierarchyFromHexString(hex: string): Packet {
  const binary = hex2binary(hex);

  function need(no: number, bits: Array<Bin>): Array<Bin> {
    const needed: Array<Bin> = [];
    while (needed.length < no) {
      needed.push(bits.shift() as Bin);
    }
    return needed;
  }

  function interpret(bits: Array<Bin>): number {
    return parseInt(bits.join(''), 2);
  }

  function getSubpackets(
    type: number,
    length: number,
    bits: Array<Bin>
  ): Array<Packet> {
    const packets: Array<Packet> = [];
    let subbits: Array<Bin>;

    if (type === 0) {
      // the subpackets are within the first ${length} bits of ${bits}
      subbits = need(length, bits);
    } else {
      subbits = bits;
    }
    while (
      // smallest package is 11 bit, a literal with value < 16
      (type === 0 && subbits.length > 10) ||
      // length is subject to how many subpackets there are
      (type === 1 && packets.length < length)
    ) {
      const version = interpret(need(3, subbits));
      const type = interpret(need(3, subbits));
      // literal
      if (type === 4) {
        let literalBin: Array<Bin> = [];
        for (;;) {
          const lastIndicator = interpret(need(1, subbits));
          literalBin = [...literalBin, ...need(4, subbits)];
          if (lastIndicator === 0) {
            break;
          }
        }
        packets.push({
          version,
          type,
          value: parseInt(literalBin.join(''), 2),
        } as LiteralPacket);
        // operator
      } else {
        const lengthType = interpret(need(1, subbits));
        const length =
          lengthType === 0
            ? interpret(need(15, subbits))
            : interpret(need(11, subbits));
        packets.push({
          version,
          type,
          lengthType,
          length,
          subPackets: getSubpackets(lengthType, length, subbits),
        } as OperatorPacket);
      }
    }
    return packets;
  }

  const version = interpret(need(3, binary));
  const type = interpret(need(3, binary));
  const lengthType = interpret(need(1, binary));
  const length =
    lengthType === 0
      ? interpret(need(15, binary))
      : interpret(need(11, binary));

  const rootPacket = {
    version,
    type,
    length,
    lengthType,
    subPackets: getSubpackets(lengthType, length, binary),
  } as OperatorPacket;
  return rootPacket;
}

export function sumOfVersions(packet: Packet): number {
  function sum(p: Packet): number {
    let s = p.version;
    if ((p as OperatorPacket).subPackets) {
      (p as OperatorPacket).subPackets.forEach((sp) => (s = s + sum(sp)));
    }
    return s;
  }

  return sum(packet);
}

export function calculateResult(packet: Packet): number {
  function calc(p: Packet): number {
    if (p.type === 4) {
      return (p as LiteralPacket).value;
    }
    if ((p as OperatorPacket).subPackets) {
      const calcedSubPackets = (p as OperatorPacket).subPackets.map((sp) =>
        calculateResult(sp)
      );
      switch (p.type) {
        // Packets with type ID 0 are sum packets - their value is the sum
        // of the values of their sub-packets. If they only have a single sub-packet, their value is the value of the sub-packet.
        case 0: {
          let sum = 0;
          calcedSubPackets.forEach((s) => (sum = sum + s));
          return sum;
        }
        // Packets with type ID 1 are product packets - their value is the
        // result of multiplying together the values of their sub-packets. If they only have a single sub-packet, their value is the value of the sub-packet.
        case 1: {
          if (calcedSubPackets.length === 1) {
            return calcedSubPackets[0];
          }
          return calcedSubPackets.reduce((p, c) => p * c);
        }
        // Packets with type ID 2 are minimum packets - their value is the
        // minimum of the values of their sub-packets.
        case 2: {
          return Math.min(...calcedSubPackets);
        }

        // Packets with type ID 3 are maximum packets - their value is the
        // maximum of the values of their sub-packets.
        case 3: {
          return Math.max(...calcedSubPackets);
        }

        // Packets with type ID 5 are greater than packets - their value is 1
        // if the value of the first sub-packet is greater than the value of
        // the second sub-packet; otherwise, their value is 0. These packets
        // always have exactly two sub-packets.
        case 5: {
          if (calcedSubPackets.length !== 2) {
            throw new Error(
              'Packet with type ID 5 must have exactly 2 subpackages, got ' +
                calcedSubPackets.length
            );
          }
          return calcedSubPackets[0] > calcedSubPackets[1] ? 1 : 0;
        }

        // Packets with type ID 6 are less than packets - their value is 1 if
        // the value of the first sub-packet is less than the value of the
        // second sub-packet; otherwise, their value is 0. These packets
        // always have exactly two sub-packets.
        case 6: {
          if (calcedSubPackets.length !== 2) {
            throw new Error(
              'Packet with type ID 6 must have exactly 2 subpackages, got ' +
                calcedSubPackets.length
            );
          }
          return calcedSubPackets[0] < calcedSubPackets[1] ? 1 : 0;
        }

        // Packets with type ID 7 are equal to packets - their value is 1
        // if the value of the first sub-packet is equal to the value of the
        // second sub-packet; otherwise, their value is 0. These packets always
        // have exactly two sub-packets.
        case 7: {
          if (calcedSubPackets.length !== 2) {
            throw new Error(
              'Packet with type ID 7 must have exactly 2 subpackages, got ' +
                calcedSubPackets.length
            );
          }
          return calcedSubPackets[0] === calcedSubPackets[1] ? 1 : 0;
        }
      }
    }
    throw new Error("Packet couldn't be calculated: " + JSON.stringify(p));
  }

  return calc(packet);
}
