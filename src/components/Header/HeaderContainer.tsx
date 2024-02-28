import { useState } from "react"

export const HeaderContainer =()=> {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    return (
        <div className="headerContainer">
            <button className="menuButton" onClick={ ()=>setIsOpenMenu(!isOpenMenu) } title="Open menu">
                <img src="./icons/menu.png" alt="menu" />
            </button>
            <div className="headerImageContainer">
                <img src="./images/algotivelogo.png" alt="algotive logo" />
            </div>
            { isOpenMenu &&
                <div className="openedMenu" onClick={ ()=>setIsOpenMenu(false) }>
                    <div className="insideMenu">
                        <div className="headerMenu">
                            <img src="./images/algotive_logo.jpeg" alt="Algotive logo" />
                            <div className="text">
                                <h3>Challenge Test</h3>
                                <p>Fetch data from a test server</p>
                            </div>
                        </div>
                        <div className="insideElement">
                            <a href="https://www.algotive.ai/" target="_blank">algotive.ai</a>
                        </div>
                        <div className="insideElement" >
                            <a href="https://www.raulacostadeveloper.com/dev" target="_blank">raulacostadeveloper.com</a>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}