import React from 'react'




const PageScroller = (props) =>
{

    return (
        <div className="scrller">
            <div className="prv">
                <button className="btn waves-effect lbl" id="Previous" onClick={props.change}>
                    Previous

                </button>
            </div>
            <div className="nxt">
                <button className="btn waves-effect lbl" id="Next" onClick={props.change}>
                    Next

                </button>
            </div>
        </div>
    )
}

export default PageScroller