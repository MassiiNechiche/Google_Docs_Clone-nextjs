import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";

function Header() {
  const [session] = useSession();
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 shadow-md bg-white ">
      <Button
        color="blue"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        onClick={signOut}
        className="h-15 w-15 border-0 mx-5"
      >
        <Icon name="logout" size="1xl" />
      </Button>
      <Icon name="description" size="2xl" color="blue" />
      <h1 className="ml-2 text-gray-700 text-1xl">Docs</h1>

      <div className="hidden md:!inline-flex mx-5 md:mx-20 flex items-center flex-grow px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <Icon name="search" size="1xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5 text-sm bg-transparent outline-none"
        />
      </div>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="ml-5 md:ml-20 h-17 w-17 border-0 my-3 mx-5"
      >
        <Icon name="apps" size="1xl" />
      </Button>
      <img
        alt=""
        src={session?.user?.image}
        loading="lazy"
        className="cursor-pointer h-10 w-10 rounded-full ml-2"
      />
    </header>
  );
}

export default Header;
