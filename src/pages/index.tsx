import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='flex flex-col items-center justify-center layout min-h-screen text-center'>
            <h1>Advent Of Code</h1>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
              (day) => (
                <CustomLink key={day} href={'/day/' + day}>
                  Day {day}
                </CustomLink>
              )
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
