function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

export default Layout;
