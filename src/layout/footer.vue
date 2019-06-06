<template>
  <div class="footer">
    <div class="content">
      <div class="inner">
        <div class="content-l fl">
          <ul class="footer-nav">
            <li>
              <a href="#">手机版本</a>
            </li>
            <li>
              <a href="#">联系我们</a>
            </li>
            <li>
              <a href="#">菲乐园</a>
            </li>
          </ul>
          <div class="declare">
            <p>
              重要聲明：本網站是以即時上載留言的方式運作，本站對所有留言的真實性、完整性及立場等，不負任何法律責任。而一切留言之言論只代表留言者個人意見，並非本網站之立場，用戶不應信賴內容，並應自行判斷內容之真實性。由於討論區是受到「即時留言」運作方式所規限，故不能完全監察所有即時留言，若讀者發現有留言出現問題，請聯絡我們。本站有權刪除任何留言及拒絕任何人士留言，同時亦有不刪除留言的權利。切勿撰寫粗言穢語、誹謗、渲染色情暴力或人身攻擊的言論，敬請自律。本網站保留一切法律權利。
            </p>
          </div>
        </div>
        <div class="content-r fl">
          <p>联系我们</p>
          <ul class="fl">
            <li>
              <img src="@/assets/images/wechat.png" alt="" />
            </li>
            <li>
              <img src="@/assets/images/phone.png" alt="" />
            </li>
            <li>
              <img src="@/assets/images/qq.png" alt="" />
            </li>
          </ul>
          <div class="qrcode fl">
            <img class="img100" src="@/assets/images/qrcode.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="copyright tc">
      <div class="inner">
        <p>
          Copyright © 1996-2019 SINA Corporation, All Rights Reserved bbs
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "footerBottom"
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 397px;
  margin-top: 94px;
  .content {
    width: 100%;
    height: 298px;
    background: #0077ff;
    .content-l {
      margin-top: 55px;
      padding-right: 44px;
      padding-bottom: 20px;
      border-right: 1px solid rgb(39, 135, 245);
      .footer-nav {
        margin-bottom: 50px;
        li {
          float: left;
          margin-right: 60px;
          a {
            color: #fff;
            font-size: 20px;
          }
        }
      }
      .declare {
        width: 714px;
        height: 111px;
        line-height: 1.714;
        p {
          font-size: 14px;
          color: rgb(199, 225, 255);
        }
      }
    }
    .content-r {
      margin-top: 55px;
      margin-left: 40px;
      p {
        font-size: 16px;
        font-family: "PingFangSC";
        color: rgb(255, 255, 255);
        margin-bottom: 20px;
      }
      li {
        float: left;
        width: 46px;
        height: 42px;
        margin-right: 10px;
        img {
          display: block;
        }
      }
      .qrcode {
        width: 170px;
        height: 170px;
        margin-left: 10px;
      }
    }
  }
  .copyright {
    width: 100%;
    height: 99px;
    background: #333;
    p {
      font-size: 14px;
      font-family: "STHeitiTC";
      color: rgb(153, 153, 153);
      line-height: 99px;
    }
  }
}
</style>
