interface Props {
  children: React.ReactNode;
}

function HomeLayout({ children }: Props): JSX.Element {
  return <main>{children}</main>;
}
export default HomeLayout;
