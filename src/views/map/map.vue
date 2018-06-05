<template>
  <div class="map">
    <!-- tab标题 -->
    <tab class="fixedTab" default-color="#333333" active-color="#f8624a" bar-active-color="#f8624a">
      <tab-item selected @on-item-click="onItemClick">高速</tab-item>
      <tab-item @on-item-click="onItemClick" class="refuel" disabled>加油站</tab-item>
      <tab-item @on-item-click="onItemClick" class="park" disabled>停车场</tab-item>
    </tab>
    <!-- tab内容 -->
    <div class="tabBarContent">
      <div class="tabBar_map" v-show='active'>
        <div id="gs_container" ref="gs_map"></div>
      </div>
      <div class="tabBar_map" v-show='active1'>
        <div id="jy_container" ref="jy_map"></div>
      </div>
      <div class="tabBar_map" v-show='active2'>
        <div id="tc_container" ref="tc_map"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'map',
  data() {
    return {
      active: true,
      active1: false,
      active2: false,
    }
  },
  activated() {
    document.title = '小K出行-智慧高速';
  },
  mounted() {
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.$refs.gs_map.style.height = h + "px";
    this.init();
  },
  methods: {
    // tab切换事件
    onItemClick(index) {
      if (index == 0) {
        this.active = true,
          this.active1 = false,
          this.active2 = false
      }
      if (index == 1) {
        this.active = false,
          this.active1 = true
        this.active2 = false
      }
      if (index == 2) {
        this.active = false,
          this.active1 = false
        this.active2 = true
      }
    },
    //地图
    init() {
      var that = this
        //定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
      var map = new qq.maps.Map(document.getElementById("gs_container"), {
        center: new qq.maps.LatLng(43.839851, 125.332902), // 地图的中心地理坐标。
        zoom: 11 // 地图的中心地理坐标。
      });

      //坐标
      var infoWin = new qq.maps.InfoWindow({
        map: map,
      });
      //坐标样式
      var anchor = new qq.maps.Point(6, 30),
        size = new qq.maps.Size(30, 32),
        origin = new qq.maps.Point(0, 0),
        icon = new qq.maps.MarkerImage('addressIcon.png', size, origin, anchor);;
      //坐标 经纬度
      var latlngs = [
        new qq.maps.LatLng(43.913740, 125.545460),
        new qq.maps.LatLng(43.969333, 125.656916),
        new qq.maps.LatLng(43.891020, 125.449530),
      ];
      //坐标名称
      var statin = ['莲花山', '龙嘉机场', '长春东'];
      for (var i = 0; i < latlngs.length; i++) {
        (function(n) {
          var marker = new qq.maps.Marker({
            position: latlngs[n],
            map: map,
            icon: icon,
          });
          //坐标点击事件
          qq.maps.event.addListener(marker, 'click', function() {
            infoWin.open();
            infoWin.setContent(statin[n]);
            infoWin.setPosition(latlngs[n]);
          });
        })(i);
      }

    }
  }
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
}

.fixedTab {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  z-index: 1111;
}


/*地图*/

.tabBarContent {
  width: 100%;
  height: 100%;
}

#gs_container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.refuel {
  color: #D0D0D0 !important;
  z-index: 1;
}

.park {
  color: #D0D0D0 !important;
  z-index: 1;
}

.smnoprint {
  display: none !important;
}
</style>
