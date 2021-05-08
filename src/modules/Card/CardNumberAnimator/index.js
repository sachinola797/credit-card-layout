import React, { Component, useEffect, useState, useRef } from 'react';
import './cardNumber.scss';

function CardNumber({text}) {
    const [placeHolder, setPlaceHolder] = useState([]);
    const ref = useRef({length: 0, addition: false});
    useEffect(() => {
        let holder = [];
        const textArray = text.split("");
        const prevLength = ref.current.length;
        const newLength = textArray.length;

        for (let i = 1; i <= 19; i++) {
            if (i%5) {
                holder.push(textArray[i-1] ? ((5<i && i<10) || (10<i && i<15) ? "*" : textArray[i-1]) : "#");
            } else {
                holder.push(" ");
            }
        }

        if (newLength>prevLength) {
            holder.splice(newLength-1, 1, {old: "#", new: holder[newLength-1]});
            ref.current = { length: newLength, addition: true };
        } else if (newLength<prevLength) {
            holder.splice(prevLength-1, 1, {old: placeHolder[newLength-1], new: "#"})
            ref.current = { length: newLength, addition: false };
        }
        setPlaceHolder(holder);
    }, [text])

    return(
        <div style={{display: "inline-flex"}}>
            {
                placeHolder.map((item, index) => {
                    return <div className="animate-text" key={index}>
                            {typeof item == "string" ? item : (
                                <>
                                    <div className={ref.current.addition ? "old1" : "old2"}>{item.old}</div>
                                    <div className={ref.current.addition ? "new1" : "new2"}>{item.new}</div>
                                </>
                            )}
                        </div>
                })
            }
          </div>
      );
  }

  export default CardNumber;