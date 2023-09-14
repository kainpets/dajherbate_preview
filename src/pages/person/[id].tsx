import { createServerSideHelpers } from "@trpc/react-query/server"
import { appRouter } from "~/server/api/root";
import superjson from "superjson"
import { createInnerTRPCContext } from "~/server/api/trpc";
import ItemsTiles from "~/components/ItemsTiles";
import { type GetStaticPaths, type GetStaticPropsContext, type InferGetStaticPropsType, type NextPage } from "next"
import Head from "next/head"
import Navbar from "~/components/Navbar"
import Main from "~/components/Ui/main";
import { api } from "~/utils/api"
import ErrorPage from "next/error"
import PersonDetails from "~/components/PersonDetails";
import { Fragment } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/Ui/table";

const PersonPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id }) => {

    const { data: person } = api.person.getById.useQuery({ id });

    const { data: packageRequests } = api.packageRequest.getRequsetsForPerson.useQuery({ personId: id });

    if (person == null) { return <ErrorPage statusCode={404} /> }

    return (
        <>
            <Head>
                <title> Person Details Page </title>
                <meta name="description" content="Daj Herbate" />
            </Head>
            <Main>
                <Navbar />
                <section className="flex flex-col items-center">
                    <div className="flex flex-col items-center gap-4 pb-4">
                        {/* // TODO: add packages basket that allows to preview currently added items */}
                        <PersonDetails person={person} />
                    </div>
                    <ItemsTiles />
                </section>
                <section className="py-4">
                    <div>
                        {packageRequests?.map((request) => (
                            <Fragment key={request.id} >
                                <Table className="flex flex-col">
                                    <TableCaption className="text-xl font-bold">
                                        Lista Zapisów
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                Request ID: {request.id}
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="flex flex-row gap-4">
                                            {request.items.map(({ item }) => (
                                                <TableCell key={item?.id} >
                                                    {item?.name}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Fragment>
                        ))}
                    </div>
                </section>
            </Main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};


export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
    const id = context.params?.id

    if (id == null) {
        return {
            redirect: {
                destination: "/"
            }
        }
    }

    const ssg = createServerSideHelpers({
        router: appRouter,
        ctx: createInnerTRPCContext({ session: null }),
        transformer: superjson, //optional - add superjson serialization
    });

    await ssg.person.getById.prefetch({ id });

    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
        },
    };
}
export default PersonPage;
