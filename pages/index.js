import Head from "next/head";
import Header from "../components/Header";
import "tailwindcss/tailwind.css";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import DocumentRow from "../components/DocumentRow";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

export default function Home() {
  const [session] = useSession();

  if (!session) return <Login />;

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  const createDocument = () => {
    if (!input) return;

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Modal
      size="sm"
      active={showModal}
      toggler={() => setShowModal(false)}
      className="z-50"
    >
      <ModalBody>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter name of the document"
          className="outline-none w-full"
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          ripple="dark"
          onClick={(e) => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button color="blue" ripple="light" onClick={createDocument}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
      <section className="bg-[#f8f9fa] pb-5 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-3 flex items-center justify-between ">
            <h4 className="text-gray-700 text-md">Start a new document</h4>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0 rounded-full"
            >
              <Icon name="more_vert" size="2xl" />
            </Button>
          </div>
          <div
            className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-300"
            onClick={() => setShowModal(true)}
          >
            <Image
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              layout="fill"
            />
          </div>
          <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Blank</p>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="2xl" color="gray" />
          </div>

          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
