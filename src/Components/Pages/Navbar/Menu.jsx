import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";


function NavBar() {
	const [showDropdown, setShowDropdown] = useState(false);
	const location = useLocation();

	return (
		<div className="flex flex-col justify-center items-start border-b border-gray-200 border-solid max-md:pr-5 mt-[4rem] ml-[2rem]">
			<div className="flex gap-10 justify-between items-start max-w-full w-[500px] max-md:gap-4 max-md:flex-wrap ">
				<Link
					to="/"
					className={location.pathname === "/" ? "nav-link active" : "nav-link"}
				>
					Home
				</Link>
				<Link
					to="/discover"
					className={
						location.pathname === "/discover" ? "nav-link active" : "nav-link"
					}
				>
					Discover
				</Link>
				<div
					className="dropdown transition:transform duration-500 hover:translate-x-2"
					onMouseEnter={() => setShowDropdown(true)}
					onMouseLeave={() => setShowDropdown(false)}
				>
					<Link
						to="/collection"
						className={
							location.pathname === "/newcollection"
								? "nav-link active whitespace-nowrap"
								: "nav-link whitespace-nowrap "
						}
					>
						Collection
					</Link>
					<img
						className="w-3 h-3 -mt-[1rem] ml-[5rem]"
						src={"src/assets/dropdown.png"}
						alt=""
					/>

					{showDropdown && (
						<div className="dropdown-content m-3 ">
							<ul>
								<li>
									<Link
										to="/newcollection"
										className={
											location.pathname === "/newcollection"
												? "nav-link active"
												: "nav-link"
										}
									>
										WHAT'S NEW
									</Link>
								</li>
								<li>
									<Link
										to="/novelties"
										className={
											location.pathname === "/novelties"
												? "nav-link active"
												: "nav-link"
										}
									>
										NOVELTIES
									</Link>
								</li>
								<li>
									<Link
										to="/timeless"
										className={
											location.pathname === "/timeless"
												? "nav-link active"
												: "nav-link"
										}
									>
										TIMELESS
									</Link>
								</li>
							</ul>
						</div>
					)}
				</div>

				<Link
					to="/catalog"
					className={
						location.pathname === "/catalog" ? "nav-link active " : "nav-link"
					}
				>
					Catalogs
				</Link>
				<Link
					to="/contact"
					className={
						location.pathname === "/contact"
							? "nav-link active whitespace-nowrap"
							: "nav-link whitespace-nowrap"
					}
				>
					Contact Us
				</Link>
				<Link
					to="/product"
					className={
						location.pathname === "/product"
							? "nav-link active whitespace-nowrap"
							: "nav-link whitespace-nowrap"}
				>
					Products
				</Link>

				<Link
					to="/event"
					className={
						location.pathname === "/event"
							? "nav-link active whitespace-nowrap"
							: "nav-link whitespace-nowrap"
					}	>
					Events
				</Link>
				<Link
					to="/privacyPolicy"
					className={
						location.pathname === "/privacyPolicy"
							? "nav-link active whitespace-nowrap"
							: "nav-link whitespace-nowrap"
					}	>
					Privacy Policy
				</Link>
				<Link
					to="/termsAndConditions"
					className={
						location.pathname === "/termsAndConditions"
							? "nav-link active whitespace-nowrap"
							: "nav-link whitespace-nowrap"
					}	>
					Terms and Conditions
				</Link>
				<Link
					to="/notFound"
					className={
						location.pathname === "/notFound"
							? "nav-link active whitespace-nowrap"
							: "nav-link whitespace-nowrap"
					}>
					Not Found
				</Link>
				<Link
					to="/blog"
					className={
						location.pathname === "/blog"
							? "nav-link active whitespace-nowrap"
							: "nav-link whitespace-nowrap"
					}>
					Blogs
				</Link>
			</div>
		</div>
	);
}
export default NavBar;
