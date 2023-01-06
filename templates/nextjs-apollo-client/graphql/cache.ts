import { InMemoryCache } from '@apollo/client'
import { persistCache } from 'apollo3-cache-persist'
//@ts-ignore
import storage from 'redux-persist/lib/storage'

const cache = new InMemoryCache()
persistCache({
  cache,
  storage
})
export default cache

// ** More Details - https://www.apollographql.com/docs/react/caching/overview */
// ** Check out TypePolicies & Field Policies for better cache orgnisation
// ** Redux Persist Cache - Optimize it later
// example for type policies
/*
{
  typePolicies:{
    RoomType:{
      fields:{
        roomImage:{
          read(roomImage){
            return roomImage.link +"width=100,height=100"
          }
        }

      }
    }
  }
}
*/
