import React from 'react';
import { useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image/Logo.png'; // Adjust the path as necessary
import { Toast } from 'primereact/toast';
import { TieredMenu } from 'primereact/tieredmenu';
import { ConfirmDialog } from 'primereact/confirmdialog';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [userImage] = useState(localStorage.getItem('userImag') || '');
    const toast = useRef(null);
    const menu = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        handleLogOut();
    };
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };


    const items = [
        { label: 'Users', icon: 'pi pi-users',items:[
            { label: 'Add New User', icon: 'pi pi-pencil', command: ()=>{handleAddUser()} },
            { label: 'Users List', icon: 'pi pi-list', command: ()=>{handleuserList()} }
        ] },
        {
            label: 'Click Me', icon: 'pi pi-fw pi-cog', command: () => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
            }
        }
    ];

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("isLoggedIn")
        navigate('/login');
    };

    const handleAddUser = () => {
        navigate('/addNewUser');
    };
    
    const handleuserList = () => {
        navigate('/userList');
    };

    const Tiereditems = [
        { label: 'Profile', icon: 'pi pi-fw pi-home' ,command:()=> navigate(`/users/${localStorage.getItem('UserId')}`)},
              {
            label: 'Click Me', icon: 'pi pi-fw pi-cog', command: () => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
            }
        },
        {
            label: 'SignOut', icon: 'pi pi-fw pi-cog', command: () => { setVisible(true) }
        }
    ];


    const start = <img alt="logo" src={logo} height="40" className="mr-2"></img>;
    const end = (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
            <ConfirmDialog group="declarative" visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <TieredMenu model={Tiereditems} popup ref={menu} breakpoint="767px" />
            <Button rounded severity="success" onClick={(e) => menu.current.toggle(e)} >
                <Avatar image={userImage} shape="circle" />
            </Button>
        </div>
    );
    // "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
    return (
        <div className="card">
            <Toast ref={toast} />
            <Menubar model={items} start={start} end={end} />
        </div>
    );
};

export default Navbar;
