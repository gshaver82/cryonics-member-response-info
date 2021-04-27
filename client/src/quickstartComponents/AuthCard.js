import React from "react";

function AuthCard({ children }) {

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col col-sm-12 col-md-10 col-lg-8">
                    <div className="recipe-border-1">
                        <div className="recipe-border-2">
                            {/* <h5 className="card-header text-center">Recipe Box</h5> */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthCard;
