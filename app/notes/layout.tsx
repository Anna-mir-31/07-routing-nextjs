export default function NotesLayout(props: any) {
  const { children, modal } = props;
  
  return (
    <>
      {children}
      {modal}
    </>
  );
}
