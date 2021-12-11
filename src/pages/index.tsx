import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <h1>Advent Of Code</h1>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((day) => (
              <CustomLink key={day} href={'/day/' + day}>
                Day {day}
              </CustomLink>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
