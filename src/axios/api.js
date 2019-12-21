/**
 * Creact by 小公主 on 2019/12/07.
 */
//所有api请求
import service from './request'
// export function _getList(data){
//     return service.get('/mock.json', data)
// }

const params = {
    page:1
}

//获取普通表格数据
export function _getList(data){
    return service.get('/mocks/table1.json',data)
}

//获取城市数据
export function requestList(data){
    return service.get('/open_city',data)
}
