import TextEditor from "../../components/TextEditor";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
import { db } from "../../firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { getSession, signOut, useSession } from "next-auth/client";
import Login from "../../components/Login";
import Head from "next/head";

const Doc = () => {
  const router = useRouter();
  const { id } = router.query;

  const [session] = useSession();

  if (!session) return <Login />;

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  if (!loadingSnapshot && !snapshot?.data()?.fileName) {
    router.replace("/");
  }

  return (
    <div>
      <Head>
        <title>Google Docs- {snapshot?.data()?.fileName}</title>
        <link
          rel="icon"
          href="https://1000logos.net/wp-content/uploads/2020/05/Google-Docs-logo.png"
        />
      </Head>
      <header className="flex justify-between items-center p-3 pb-1 overflow-auto">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <Icon name="description" size="4xl" color="blue" />
        </span>

        <div className="flex-grow px-3">
          <h2 className="font-semibold text-base">
            {snapshot?.data()?.fileName}
          </h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 min-h-min text-gray-600 w-4/5 flex-wrap">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          className="hidden md:!inline-flex h-10 mr-4"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
        >
          <Icon name="people" size="md" /> Share
        </Button>
        <img
          src={session?.user?.image}
          alt=""
          className="rounded-full h-10 w-10 cursor-pointer ml-2 mr-2"
          onClick={signOut}
        />
      </header>

      <TextEditor />
    </div>
  );
};

export default Doc;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
