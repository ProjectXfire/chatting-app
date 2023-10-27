interface Props {
  children: React.ReactNode;
}

function ConversationsLayout({ children }: Props): JSX.Element {
  return <main>{children}</main>;
}
export default ConversationsLayout;
