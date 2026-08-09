import './MainCard.css';

import Home from './SidebarContents/Home';
import MyCloud from './SidebarContents/MyCloud';
import SharedWithMe from './SidebarContents/SharedWithMe';
import Recent from './SidebarContents/Recent';
import Starred from './SidebarContents/Starred';
import Bin from './SidebarContents/Bin';

function MainCard({ activeTab }) {

    let content;

    switch (activeTab) {
        case "Home":
            content = <Home />;
            break;

        case "My Cloud":
            content = <MyCloud />;
            break;

        case "Shared With Me":
            content = <SharedWithMe />;
            break;

        case "Recent":
            content = <Recent />;
            break;

        case "Starred":
            content = <Starred />;
            break;

        case "Bin":
            content = <Bin />;
            break;

        default:
            content = <Home />;
    }

    return (
        <div className="main-card">
            {content}
        </div>
    );
}

export default MainCard;