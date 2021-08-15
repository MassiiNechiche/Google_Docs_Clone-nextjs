import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";

const DocumentRow = ({ id, fileName, date }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center p-1 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer text-sm"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-5 truncate min-w-min">{fileName}</p>
      <p className="pr-5 text-sm  truncate">
        {date?.toDate().toLocaleString()}
      </p>
      <Button
        color="gray"
        buttonType="outline"
        iconOnly={true}
        ripple="dark"
        className="border-0 rounded-full"
      >
        <Icon name="more_vert" size="3xl" />
      </Button>
    </div>
  );
};

export default DocumentRow;
