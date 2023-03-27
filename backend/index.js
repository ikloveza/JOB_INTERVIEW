const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json());

//เชื่อมต่อ Database`
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "job_interview",
});

//1. (GET) All of the shops.
app.get("/api/terminals", (req, res) => {
  db.query("SELECT * FROM terminal_info ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      res.status(200)
    }
  });
});

//2.(GET) Show shop information in TERM_ID: 517704
app.get("/api/terminals/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM terminal_info WHERE TERM_ID = ? ",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        res.status(200)
      }
    }
  );
});

//3. (POST) Add shop record TERM_ID: 517705
app.post("/api/terminals", (req, res) => {
  let body3 = {
    TERM_ID: "517705",
    BRANCH: "5177",
    VENDORNO: "0000000000",
    PRODUCTNO: "0000000000",
    PMINO: "xxxxxxxxxxxx4",
    BATCH: 1,
    SLIPNO: 1,
    TERM_NAME: "TEST517705",
    TERM_FOOD: "XXX",
    PAYPERCENT: 35.0,
    PAYPERDAY: 0.0,
    INCLUDEVAT: "1",
    INV_PRINT: "1",
    INV_NAME: "บริษัท ราดหน้า เชลล์ชวนชิม หลังห้อยเทียนเหลา จำกัด",
    INV_ADDR: "3/17 ถนนแจ้งวัฒนะ ตำบลบางพูด อำเภอปากเกร็ด จังหวัด",
    TERM_FLAG: "1",
    TYPEPAY: "1",
    STAFFOFCHARGE: 0.0,
    STAFFPRODUCTNO: "/",
    CUSTOMER_REF: "519250",
    RENTAL_ID: "000FG004",
    HORIZON_SENT: "Y",
    LEASE_TYPE: "",
    CLUBCARD_CODE: null,
    CLUBCARD_AMT: 100.0,
    CLUBCARD_POINT: 1,
    TERMINAL_TYPE: "D",
  };
  db.query("INSERT INTO terminal_info SET ?", [body3], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values insert");
      res.status(200)
    }
  });
});

//4. (PUT) แก้ไขข้อมูลร้านค้า TERMINAL_TYPE จาก D เป็น E ของ TERM_ID: 517704
app.put("/api/terminals", (req, res) => {
  body4 = {
    TERM_ID: "517704",
    TERMINAL_TYPE: "E",
  };

  db.query(
    "UPDATE  terminal_info  set TERMINAL_TYPE =? WHERE   TERM_ID = ?",
    [body4.TERMINAL_TYPE, body4.TERM_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("UPDATE  SUCCESS");
        res.status(200)
      }
    }
  );
});

//5. (DELETE) Delete shop record TERM_ID: 517703
app.delete("/api/terminals/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM terminal_info WHERE TERM_ID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("DELETE  SUCCESS");
      res.status(200)
    }
  });
});



//6. (PUT) Update the value QTY for all records in TEST_TABLE of field MIN and the updated value must not be greater than MAX.
//Expected Result: Loop passes 3 times and rejects 2 times.
app.put("/api/update", (req, res) => {
  const itemId = req.body.ITEMCODE;
  const QTY = req.body.QTY;
  db.query(
    "UPDATE test_table SET  MIN = ?  WHERE ITEMCODE = ?",
    [QTY, itemId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating item");
      } else {
        res.send("Item updated successfully");
        res.status(200)
      }
    }
  );
});

//6. part 2
const loop_item = () => {
  db.query("SELECT * FROM test_table", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //Map data
      const itemData = result.map((item) => ({
        ITEMCODE: item.ITEMCODE,
        ITEMNAME: item.ITEMNAME,
        MIN: item.MIN,
        MAX: item.MAX,
      }));

      let count = 5;
      itemData.forEach((item) => {
        for (let i = 1; i <= count; i++) {
          if (i > parseInt(item.MAX)) {
            console.log("รับครั้งที่ "+i+" Full Item เต็ม รับได้เต็มที่ แค่ 3 ");
          } else {
            const get_itemcode = item.ITEMCODE;
            const url = "http://localhost:3001/api/update";
            axios
              .put(url, { ITEMCODE: get_itemcode, QTY: i  })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log("err", err.message);
              });
              i++
          }
        }
      });
    }
  });
};


loop_item();


//`Start Server
app.listen("3001", () => {
  console.log("Server is Running on port 3001");
});
