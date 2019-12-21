/**
 * Creact by 小公主 on 2019/12/07.
 */
const initState = {
    title:'1111111'
}

export default (state = initState,action)=>{
    console.log('store接收action传给reducer', state, action)
}