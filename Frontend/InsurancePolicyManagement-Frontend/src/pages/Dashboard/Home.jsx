import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta title="Home Service Finder Admin Dashboard" description="Home Service Finder Admin Dashboard" />

      <div className="col-span-12 bg-red-500 text-white p-4">
  Saiman test
</div>

      <div className="grid grid-cols-12 gap-6">
        {/* Row 1: full‑width metrics */}
        <div className="col-span-12">
          Saiman Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto mollitia, ratione earum laudantium blanditiis deleniti, eum fugiat tenetur incidunt vel numquam expedita obcaecati voluptatibus esse facilis ab veniam error libero.
        </div>
        {/* Row 2: two half‑width charts */}
        <div className="col-span-12 lg:col-span-6">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima enim magni dolores neque eaque reiciendis vero veniam sequi doloribus, harum, quidem explicabo autem, natus nam labore quam possimus obcaecati nostrum.
        </div>
        <div className="col-span-12 lg:col-span-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, recusandae consectetur. Necessitatibus iste debitis quis esse eligendi maiores, minus dicta molestiae quaerat natus reprehenderit autem inventore hic cumque harum quasi?
        </div>

        {/* Row 3: full‑width revenue */}
        <div className="col-span-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsum quisquam dolore suscipit officia facilis nemo natus expedita voluptatibus, voluptatem molestias sapiente ut! Fuga, aliquam rerum omnis culpa architecto ipsam!
        </div>
      </div>
    </>
  );
}