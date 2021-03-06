import { wittysContent } from "../../apis/wittys";
import WittyComponent from "../V2WittyContents/WittyComponent";
import V2WittyLoading from "../V2WittyLoading/V2WittyLoading";
import {useEffect, useState} from "react";
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { MehOutlined } from '@ant-design/icons';



function V2WittyAddContents(props){

  const [loading,setLoading] = useState(false);
  let page = 0;
  let myWitty = props.user.user_id;
  const [target,setTarget] = useState("");
  const [observerBreak,setobserverBreak] = useState(false);

  

  
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !loading) {
      observer.unobserve(entry.target);
      setLoading(true);
      showContent(page);
      page++;
      setTimeout(()=>{
        observer.observe(entry.target)
        setLoading(false);
      },2000);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      // callback 함수, option
      observer = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);


  const [content,setContent] = useState([]);//주요 컨텐츠
  const userContent = [];
  const [myContent,setMyContent] = useState([]);//나의 컨텐츠
  const copyMyContent = [];

  useEffect(()=>{
    showContent(0);
    page++;
    return () => setLoading(false);
  },[])

  
  const showContent = async (nowPage) => {
    try{
      const result =  await wittysContent(nowPage);
      const copyResult = result.data;
      if(copyResult.length===0){
        setobserverBreak(true);
      }
      addContent(copyResult)
    }catch(e){
      console.log(e);
    }
    
  }

  const addContent = (data)=>{
    if(data.length === 0){
      userContent.push(
        <Result
          icon={<SmileOutlined style={{color:"#6AAFE6"}}/>}
          title="팔로우한 사람들의 위티가 더이상 존재하지않아요!"
        />
      )
      copyMyContent.push(
        <Result
          icon={<MehOutlined  style={{color:"#6AAFE6"}}/>}
          title="내가 공유한 위티가 더이상 존재하지않아요!"
        />
      )
      setContent(userContent,[...content])
      setMyContent(copyMyContent,[...myContent])
    }else{
      for(let i=0;i<data.length;i++){ 
        userContent.push(<WittyComponent 
          data = {data[i]} 
          key={data[i].id} 
          myWitty = {myWitty}
          setWittySuccesFlag={props.setWittySuccesFlag} 
          wittySuccesFlag={props.wittySuccesFlag}></WittyComponent>)
        if(myWitty===data[i].user.id){
          copyMyContent.push(<WittyComponent 
            data = {data[i]} 
            myWitty = {myWitty} 
            key={data[i].id} 
            setWittySuccesFlag={props.setWittySuccesFlag} 
            wittySuccesFlag={props.wittySuccesFlag}></WittyComponent>)
        }
      }
      setContent(userContent,[...content])
      setMyContent(copyMyContent,[...myContent])
    }
  }

  function setObserver(){
    return(
      <div style={{height:"20px"}} key={props.data} ref={setTarget}>
        {/*옵저버 필요하면 P태그로 보세용*/}
      </div>
    )
  }

  if(props.contentKey===1){
    return(
      <div style={{width:"100%", maxWidth:"512px",margin:"0 auto",paddingTop:"24px",paddingBottom:"65px"}}>
        <div>
          {content}
        </div>
        {observerBreak === false?setObserver():null}
        <div style={{position:"absolute",left:"47%"}}>
          {loading?<V2WittyLoading/>:null}
        </div>
      </div>    
    )
  }else{
    return(
      <div style={{width:"100%", maxWidth:"512px",margin:"0 auto",paddingBottom:"65px"}}>
        <div>
          {myContent}
        </div>
        {observerBreak === false?setObserver():null}
        <div style={{position:"absolute",left:"48%"}}>
          {loading?<V2WittyLoading/>:null}
        </div>
      </div>    
    )
  }
  
}

export default V2WittyAddContents;