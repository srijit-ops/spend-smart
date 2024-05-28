import Header from "./Header";

function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default RootLayout;
