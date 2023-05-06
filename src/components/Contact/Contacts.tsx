import React from "react";
import style from "./Contacts.module.css"

const Contacts = () =>{
   return(
      <div className={style.contacts_block}>
      <h3>Our contacts</h3>
      <ul>
        <li><strong>Address:</strong> Ukraine, Poltava</li>
        <li><a href="tel:+380507530370"><strong>Phone:</strong> +38 (050) 753-03-70</a></li>
        <li><a href="mailto:ysilkov@ukr.net"><strong>Email:</strong> ysilkov@ukr.net</a></li>
      </ul>
    </div>
   )
}

export default Contacts;