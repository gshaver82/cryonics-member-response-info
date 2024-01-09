import React from "react";

function AppProfileDelete() {

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