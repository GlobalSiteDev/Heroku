import React from 'react';
import SideNav from 'react-simple-sidenav';
import Items from './Items/Items';

const sideNav = (props) => (
    <div>
        <SideNav
            openFromRight={true}
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    background: '#242424',
                    maxWidth: '30%',
                    paddingTop: '30px'
                }}
        >
            <Items onClick={props.onClick} />
        </SideNav>
    </div>
)

export default sideNav;
