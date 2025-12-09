import {withAuth} from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/api/auth/signin',
  },
});

// optionally limit which paths this runs on
export const config = {
  matcher: [
 
    "/issues/new",
    "/issues/:id+/edit",
  ],
};
