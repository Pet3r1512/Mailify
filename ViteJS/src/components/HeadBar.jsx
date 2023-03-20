export default function HeadBar() {
  return (
    <div className="flex w-full py-5 justify-between bg-white">
      <a href="/">
        <img srcSet="/images/mailify.png 2.8x" alt="" />
      </a>
      <div className="flex gap-4">
        <a href="/signin">
          <button className="btn hover:text-white btn-outline btn-primary">
            Sign In
          </button>
        </a>
        <a href="/register">
          <button className="btn text-white btn-active btn-primary">
            Create an account
          </button>
        </a>
      </div>
    </div>
  );
}
