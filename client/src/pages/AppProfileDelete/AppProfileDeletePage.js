import React, { useEffect } from 'react';
import API from "../../utils/API";

async function AppProfileDelete() {
    useEffect(() => {
        handleDelReq()
    }, []);

    async function handleDelReq() {
        try {
            let number = 3456
            const response = await API.appProfileDelete(number)
            console.log("🚀 ~ AppProfileDelete ~ response:", response)
        } catch (error) {
            console.log("🚀 ~ handleDelReq ~ error:", error)

        }
    }


    return (
        <div>

            <h1 >Autoheartwatch app profile deletion page</h1>
            <p>If you have saved a profile in the Autoheartwatch app
                and want to delete it without reinstalling the app,
                you may do that here.
                Please enter your phone number below.
                The server will send your number a verification text.
                Reply DELETE to that text and your profile will be deleted.
            </p>
        </div>
    );
}

export default AppProfileDelete;