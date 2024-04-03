import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setIsMenuOpen(open);
	};

	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{["Home", "Discover", "Collection", "Catalogs", "Contact Us"].map(
					(text) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					)
				)}
			</List>
		</Box>
	);

	const desktopMenu = (
		<Box
			sx={{
				// flexGrow: 1,
				display: { xs: "none", md: "flex" },
				// justifyContent: "space-evenly",
				marginTop: isDesktop ? "2rem" : 0,
				marginLeft: isDesktop ? "1rem" : 0, // Add marginTop only in desktop view
				gap: isDesktop ? "0rem" : 0, // Add gap between items only in desktop view
			}}
		>
			{["Home", "Discover", "Collection", "Catalogs", "Contact Us"].map(
				(text) => (
					<ListItemButton key={text}>
						<ListItemText primary={text} />
					</ListItemButton>
				)
			)}
		</Box>
	);

	return (
		<React.Fragment>
			{!isDesktop && (
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={toggleDrawer(true)}
					sx={{ mr: 6, display: { md: "none" } }}
				>
					{isMenuOpen ? <CloseIcon /> : <MenuIcon />}
				</IconButton>
			)}
			<Drawer anchor={"left"} open={isMenuOpen} onClose={toggleDrawer(false)}>
				{list()}
			</Drawer>
			{isDesktop && desktopMenu}
		</React.Fragment>
	);
};

export default Navbar;
