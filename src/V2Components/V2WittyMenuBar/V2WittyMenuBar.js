import styles from "./style.module.css";
import { Layout, Menu } from 'antd';

const { Header } = Layout;


function V2WittyMenuBar(props){

  return(
    <Layout style={{backgroundColor:"#e9f0f5",width:"100%"}} >
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{
          width:"80%",
          margin:"0px auto",
          textAlign:"center",
          backgroundColor:"#209dcd",
          borderRadius:"10px",
          borderBottomLeftRadius:"0px",
          borderBottomRightRadius:"0px"
      }}>
        <Menu.Item onClick={()=>{props.getMenuNum(1)}} style={{textAlign:"center",marginLeft:"10%"}} key="1"><img src={require("../../assets/images/img/home.png")}></img></Menu.Item>
        <Menu.Item onClick={()=>{props.getMenuNum(2)}} style={{textAlign:"center",marginLeft:"10%"}} key="2"><img src={require("../../assets/images/img/user.png")}></img></Menu.Item>
        <Menu.Item onClick={()=>{props.getMenuNum(3)}} style={{textAlign:"center",marginLeft:"10%"}} key="3"><img src={require("../../assets/images/img/users.png")}></img></Menu.Item>
        <Menu.Item onClick={()=>{props.getMenuNum(4)}} style={{textAlign:"center",marginLeft:"10%"}} key="4"><img src={require("../../assets/images/img/notification.png")}></img></Menu.Item>
      </Menu>
    </Layout>
  )
}

export default V2WittyMenuBar;