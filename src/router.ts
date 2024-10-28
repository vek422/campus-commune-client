import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { withAuthGaurd } from "./components/AuthGaurd";
import Home from "./pages/Home";
import Commune from "./pages/Commune/CommuneLayout";
import CreateCommune from "./pages/Commune/CreateCommune";
import CommuneLayout from "./pages/Commune/CommuneLayout";
import CommuneHome from "./pages/Commune/CommuneHome";
import Channel from "./pages/Commune/Channel";

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
    Component: withAuthGaurd(Home),
  },
  {
    path: "/commune/create-commune",
    Component: withAuthGaurd(CreateCommune),
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
      }
    ]
  },

]);
