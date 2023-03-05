const { createContext, useState } = require("react");

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [userInfo, setuserInfo] = useState({})
    return(
        <UserContext.Provider value={{ userInfo, setuserInfo }}>
            {children}
        </UserContext.Provider>
    )
}
/* const [[count, setCount], [percentage, setPercentage]] = useContext(AppContext) */
/* const {count, setCount, percentage, setPercentage} = useContext(AppContext) */