import { useSession } from "next-auth/react";
import AddPerson from "~/components/AddPerson";
import Login from "~/components/Login";
import Navbar from "~/components/Navbar";
import { columns } from "~/components/Ui/columns";
import { DataTable } from "~/components/Ui/data-table";
import Main from "~/components/Ui/main";
import { api } from "~/utils/api";

const zapisy = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  const { data } = api.person.getAll.useQuery();

  if (!session) {
    return <Login />
  }

  return (
    <Main>
      <Navbar className="mx-auto pt-4 pb-12 px-4" />
      <AddPerson className="py-4" />
      <>
        {/* //* Go to /components/Ui/columns.ts to change displayed data */}
        {data && <DataTable columns={columns} data={data} />}
      </>
    </Main>
  );
};

export default zapisy;
