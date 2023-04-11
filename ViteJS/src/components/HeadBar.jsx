export default function HeadBar() {
  return (
    <div className="flex w-full py-5 px-5 sm:px-0 items-center justify-between bg-white">
      <a href="/">
        <img
          srcSet="/images/mailify.png 2.8x"
          className="hidden sm:block"
          alt=""
        />
        <img
          srcSet="/images/mailify_logo.png 2.8x"
          className="sm:hidden"
          alt=""
        />
      </a>
      <div className="flex gap-4">
        <a href="/signin">
          <button className="btn hover:text-white btn-outline btn-primary">
            Sign In
          </button>
        </a>
        <a href="/register" className="hidden sm:block">
          <button className="btn text-white btn-active btn-primary">
            Create an account
          </button>
        </a>
      </div>
    </div>
  );
}
