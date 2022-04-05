import React from "react";
import { BiBook, BiLibrary, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

function Dashboard({ bookNum, historyNum, userNum, staffNum }) {
  return (
    <div class="shadow-lg stats stats-vertical lg:stats-horizontal lg:mt-9 mt-2 md:mt-5">
      <div class="flex flex-col lg:w-full w-auto lg:flex-row items-center md:items-start">
        <Link to="/admin/book">
          <div class="stat md:w-56 w-auto">
            <div class="stat-figure text-primary">
              <BiBook class="inline-block w-8 h-8" />
            </div>
            <div class="stat-title">หนังสือทั้งหมด</div>
            <div class="stat-value text-primary">{bookNum.length}</div>
            <div class="stat-desc">+ เพิ่มข้อมูล</div>
          </div>
        </Link>
        <div class="divider lg:divider-horizontal"></div>
        <Link to="/admin/list">
          <div class="stat md:w-56 w-auto">
            <div class="stat-figure text-secondary">
              <BiLibrary class="inline-block w-8 h-8 stroke-current" />
            </div>
            <div class="stat-title">รายการยืมหนังสือ</div>
            <div class="stat-value text-secondary">{historyNum.length}</div>
          </div>
        </Link>
        <div class="divider lg:divider-horizontal"></div>
        <Link to="/admin/user">
          <div class="stat md:w-56 w-auto">
            <div class="stat-figure text-secondary">
              <BiUser class="inline-block w-8 h-8 stroke-current" />
            </div>
            <div class="stat-title">จำนวนผู้ใช้</div>
            <div class="stat-value">{userNum.length}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
