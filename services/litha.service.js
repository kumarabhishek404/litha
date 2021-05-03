import { DeleteWithToken, GetWithToken, PostWithToken } from "../lib/request"

 /**
 * @description
 * @author jagannath
 * @date 11/04/2021
 * @param data:Object {imageUrl: String, headText?: String, ctaLink?: String}
 */
export const addNewLithaApi = (data) => {
    return PostWithToken('/litha', data)
}

 /**
 * @description method to get all litha data from api
 * @author jagannath
 * @date 11/04/2021
 * @param query:Object {limit=10, skip=0}
 */
export const getLithaApi = ({limit=10, skip=0}) => {
    return GetWithToken(`/litha?limit=${limit}&skip=${skip}`)
} 


 /**
 * @description method to delete litha data by id
 * @author jagannath
 * @date 11/04/2021
 * @param id: String - litha id
 */
  export const deleteLithaApi = (id) => {
    return DeleteWithToken(`/litha/${id}`)
} 