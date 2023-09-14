
interface MainProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const Main = (props: MainProps) => {
  return (
    <main className={`${props.className} bg-slate-200 min-h-screen min-w-max flex flex-col items-center overflow-auto`}>
      {props.children}
    </main>
  )
}

export default Main