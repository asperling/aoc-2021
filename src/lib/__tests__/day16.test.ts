import {
  calculateResult,
  getPacketHierarchyFromHexString,
  sumOfVersions,
} from '@/lib/day16';

describe('Day 16', () => {

  describe('Sum of versions', () => {
    test('8A004A801A8002F478 should have a version sum of 16', () => {
      expect(
        sumOfVersions(getPacketHierarchyFromHexString('8A004A801A8002F478'))
      ).toBe(16);
    });

    test('620080001611562C8802118E34 should have a version sum of 12', () => {
      expect(
        sumOfVersions(
          getPacketHierarchyFromHexString('620080001611562C8802118E34')
        )
      ).toBe(12);
    });

    test('C0015000016115A2E0802F182340 should have a version sum of 23', () => {
      expect(
        sumOfVersions(
          getPacketHierarchyFromHexString('C0015000016115A2E0802F182340')
        )
      ).toBe(23);
    });

    test('A0016C880162017C3686B18A3D4780 should have a version sum of 31', () => {
      expect(
        sumOfVersions(
          getPacketHierarchyFromHexString('A0016C880162017C3686B18A3D4780')
        )
      ).toBe(31);
    });
  });

  describe('Calculation of packages', () => {
    test('C200B40A82 should have a result of 3', () => {
      expect(
        calculateResult(getPacketHierarchyFromHexString('C200B40A82'))
      ).toBe(3);
    });

    test('04005AC33890 should have a result of 54', () => {
      expect(
        calculateResult(getPacketHierarchyFromHexString('04005AC33890'))
      ).toBe(54);
    });

    test('880086C3E88112 should have a result of 7', () => {
      expect(
        calculateResult(getPacketHierarchyFromHexString('880086C3E88112'))
      ).toBe(7);
    });

    test('CE00C43D881120 should have a result of 9', () => {
      expect(
        calculateResult(getPacketHierarchyFromHexString('CE00C43D881120'))
      ).toBe(9);
    });

    test('D8005AC2A8F0 should have a result of 1', () => {
      expect(
        calculateResult(getPacketHierarchyFromHexString('D8005AC2A8F0'))
      ).toBe(1);
    });

    test('F600BC2D8F should have a result of 0', () => {
      expect(
        calculateResult(getPacketHierarchyFromHexString('F600BC2D8F'))
      ).toBe(0);
    });

    test('9C005AC2F8F0 should have a result of 0', () => {
      expect(
        calculateResult(getPacketHierarchyFromHexString('9C005AC2F8F0'))
      ).toBe(0);
    });

    test('9C0141080250320F1802104A08 should have a result of 1', () => {
      expect(
        calculateResult(
          getPacketHierarchyFromHexString('9C0141080250320F1802104A08')
        )
      ).toBe(1);
    });
  });
});
