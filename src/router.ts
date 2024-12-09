import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { withAuthGaurd } from "./components/AuthGaurd";
import Explore from "./pages/Explore";
import CreateCommune from "./pages/Commune/CreateCommune";
import CommuneLayout from "./pages/Commune/CommuneLayout";
import CommuneHome from "./pages/Commune/CommuneHome";
import Channel from "./pages/Commune/Channel";
import CommuneManage from "./pages/Commune/CommuneManage";
import SearchThread from "./pages/SearchThread";
import ThreadDetail from "./pages/Commune/ThreadDetail";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: withAuthGaurd(SearchThread),
  },
  {
    path: "/commune/create-commune",
    Component: withAuthGaurd(CreateCommune),
  },
  {
    path: "/communes",
    Component: withAuthGaurd(Explore)
  },
  {
    path: "/thread-search",
    Component: withAuthGaurd(SearchThread)
  },
  {
    path: "/commune",
    Component: withAuthGaurd(CommuneLayout),
    children: [
      {
        path: ":communeId",
        Component: CommuneHome
      }, {
        path: ":communeId/channel/:channelId",
        Component: Channel
      },
      {
        path: ":communeId/channel/:channelId/thread/:threadId",
        Component: ThreadDetail
      },
      {
        path: ":communeId/manage",
        Component: CommuneManage
      }
    ]
  },

]);
