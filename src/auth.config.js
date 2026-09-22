// Configuración "edge-safe": sin providers que toquen la base de datos.
// La usa el proxy (antes "middleware") para proteger rutas.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      if (pathname.startsWith("/admin")) {
        return isLoggedIn && auth.user.role === "ADMIN";
      }
      if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/tickets") ||
        pathname.startsWith("/cuenta")
      ) {
        return isLoggedIn;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [],
};
