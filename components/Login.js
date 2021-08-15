import Button from "@material-tailwind/react/Button";
import { signIn } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Google Docs - Login</title>
        <link
          rel="icon"
          href="https://1000logos.net/wp-content/uploads/2020/05/Google-Docs-logo.png"
        />
      </Head>
      <Image
        src="https://i.pinimg.com/originals/c4/b7/e9/c4b7e910d6116073f9efd0e343342920.png"
        height="300"
        width="550"
        objectFit="contain"
        alt=""
      />
      <Button
        className="w-44 mt-10"
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
