import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Button } from "@mui/material";
import { styled } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

const StyledContainer = styled("div")({
  width: 350,
  padding: 25,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace",
});

const StyledAvatar = styled(Avatar)({
  width: 200,
  height: 200,
  cursor: "pointer",
  backgroundColor: "#EEBC1D",
  objectFit: "contain",
});

const StyledProfile = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
});

const StyledButton = styled(Button)({
  width: "100%",
  height: "8%",
  marginTop: 20,
  backgroundColor: "#EEBC1D",
  fontWeight: "bold",
  fontSize: "15px",
});

const StyledWatchlist = styled("div")({
  flex: 1,
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll",
});

const StyledCoinName = styled("div")({
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
});

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const logOut = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });
    toggleDrawer();
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* added photo avatar for login signup */}
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <StyledContainer>
              <StyledProfile>
                <StyledAvatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />

                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>

                <StyledWatchlist>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>

                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <StyledCoinName>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer", marginTop: "3px" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </StyledCoinName>
                      );
                  })}
                </StyledWatchlist>
              </StyledProfile>

              <StyledButton variant="contained" onClick={logOut}>
                Log Out
              </StyledButton>
            </StyledContainer>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
