function main() {
  $("input[type=range]").each(function () {
    $(this).on('input', function(){
          $("#"+$(this).attr("id") + "Display").text(  $(this).val() + $("#"+$(this).attr("id")+"Display").attr("data-unit")  );
    });
  });
}

function roXaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                [0, Math.cos(theta), -Math.sin(theta)], 
                [0, Math.sin(theta), Math.cos(theta)]
                ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function roYaxis(point, theta) {
    var pointVec = point;
    var M = [[Math.cos(theta), 0, Math.sin(theta)],
                   [0, 1, 0],
                   [-Math.sin(theta), 0, Math.cos(theta)]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function roZaxis(point, theta) {
    var pointVec = point;
    var M = [[Math.cos(theta), -Math.sin(theta), 0],
                   [Math.sin(theta), Math.cos(theta), 0],
                   [0, 0 ,1]
                  ]
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function skewXaxis(point, theta) {
    var pointVec = point;
    var M = [[1, Math.tan(theta), 0],
                   [0, 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function skewYaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [Math.tan(theta), 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function skewZaxis(point, theta) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, 1, 0],
                   [0, Math.tan(theta) ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function scaleallaxis(point, scale) {
    var pointVec = point;
    var M = [[scale, 0, 0],
                   [0, scale, 0],
                   [0, 0 ,scale]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function scaleXaxis(point, scale) {
    var pointVec = point;
    var M = [[scale, 0, 0],
                   [0, 1, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function scaleYaxis(point, scale) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, scale, 0],
                   [0, 0 ,1]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function scaleZaxis(point, scale) {
    var pointVec = point;
    var M = [[1, 0, 0],
                   [0, 1, 0],
                   [0, 0 ,scale]
                  ];
    var pointRot = math.multiply(M,pointVec);
    return pointRot;
    }

function master(transformation, initalparam, finalparam,xinit,yinit,zinit){
    t = numeric.linspace(initalparam,finalparam  ,10);
    frames = []

    for (var i = 0 ; i < t.length ; i++) {
        xrot1 = []
        yrot1 = []
        zrot1 = []
        var point, pointOut;
        for (var j = 0 ; j < 8 ; j++) {
            point = [xinit[j],yinit[j],zinit[j]];
            pointOut = transformation(point,t[i]);
            xrot1.push(pointOut[0]);
            yrot1.push(pointOut[1]);
            zrot1.push(pointOut[2]);
        }
        cubeRotation = [{
        type: "mesh3d",
        x: xrot1,
        y: yrot1,
        z: zrot1,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
        colorscale: [
          [0, 'rgb(255,255,255)'],
          [0.5, 'rgb(0,133,202)'],
          [1, 'rgbrgb(0,62,116)']
        ],
        showscale: false
        }]
        ;
        name = 'frame' + i;
        frames.push({
          "name": name,
          "data": cubeRotation
          }
        )
    }
    return frames;
}

function openTrans(evt, TransName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(TransName).style.display = "block";
    evt.currentTarget.className += " active";
}

function graphReset(where){
    xrot1 = [-1., -1., 1., 1., -1., -1., 1., 1.];
    yrot1 = [-1., 1., 1., -1., -1., 1., 1., -1.];
    zrot1 = [-1., -1., -1., -1., 1., 1., 1., 1.];


    what = [{
        type: "mesh3d",
        x: xrot1,
        y: yrot1,
        z: zrot1,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
        colorscale: [
          [0, 'rgb(255,255,255)'],
          [0.5, 'rgb(0,133,202)'],
          [1, 'rgbrgb(0,62,116)']
        ],
        showscale: false
        }]
    how = {
  scene:{
	 aspectmode: "manual",
   aspectratio: {
     x: 1, y: 1, z: 1,
    },
   xaxis: {
    range: [-3, 3],
  },
   yaxis: {
    range: [-3, 3],
  },
   zaxis: {
   range: [-3, 3],
  }},
     margin:  {l: 0, r:0,t:0,b:0},
};
    Plotly.newPlot(where, what, how )
}

function graphThat(xx, yy, zz,){

    what = [{
        type: "mesh3d",
        x: xx,
        y: yy,
        z: zz,
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
        colorscale: [
          [0, 'rgb(255,255,255)'],
          [0.5, 'rgb(0,133,202)'],
          [1, 'rgbrgb(0,62,116)']
        ],
        showscale: false
        }]
    layout = {
  scene:{
	 aspectmode: "manual",
   aspectratio: {
     x: 1, y: 1, z: 1,
    },
   xaxis: {
    range: [-3, 3],
  },
   yaxis: {
    range: [-3, 3],
  },
   zaxis: {
   range: [-3, 3],
  }},
};
    Plotly.newPlot('graph', what, layout )
}
        
function Rotate(){
    axisSelector = document.getElementById("RotateSelect").value
    angleSelector = document.getElementById("RotateSlider").value
    angle = angleSelector*Math.PI
    if (axisSelector ==="RotXaxis") {
        framesnew = master(roXaxis,0,angle,xrot1,yrot1,zrot1)
        console.log(framesnew)
        
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);

    } else if (axisSelector === "RotYaxis") {
        framesnew = master(roYaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        
    } else {
        framesnew = master(roZaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
    }
    

    
}

function Skew(){
    axisSelector = document.getElementById("SkewSelect").value
    angleSelector = document.getElementById("SkewSlider").value
    angle = angleSelector*Math.PI
    if (axisSelector ==="SkewXaxis") {
        framesnew = master(skewXaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
    } else if (axisSelector === "SkewYaxis") {
        framesnew = master(skewYaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        
    } else {
        framesnew = master(skewZaxis,0,angle,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
    }   
}

function Scale(){
    axisSelector = document.getElementById("ScaleSelect").value
    scaleSelector = document.getElementById("ScaleSlider").value
    if (axisSelector ==="ScaleXaxis") {
        framesnew = master(scaleXaxis,1,scaleSelector,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
    } else if (axisSelector === "ScaleYaxis") {
        framesnew = master(scaleYaxis,1,scaleSelector,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        
    } else if (axisSelector === "ScaleZaxis") {
        framesnew = master(scaleZaxis ,1,scaleSelector,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
    }  else {
        framesnew = master(scaleallaxis ,1,scaleSelector,xrot1,yrot1,zrot1)
        Plotly.animate('graph', framesnew, {transition: {
          duration: 100,
          easing: 'linear'
        },frame: {
          duration: 100,
          redraw: false,
        },mode: 'immediate'},layout);
        
    }
}

var axisSelector
var angleSelector
var angle
var scaleSelector
var xx = [-1., -1., 1., 1., -1., -1., 1., 1.];
var yy = [-1., 1., 1., -1., -1., 1., 1., -1.];
var zz = [-1., -1., -1., -1., 1., 1., 1., 1.];
var data = [];
var framesnew
var initial = [{
    type: "mesh3d",
    x: xx,
    y: yy,
    z: zz,
    i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
    j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
    k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
    intensity: [0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 1],
    colorscale: [
      [0, 'rgb(255,255,255)'],
      [0.5, 'rgb(0,133,202)'],
      [1, 'rgbrgb(0,62,116)']
    ],
    showscale: false
    }]

var name
var data = [];
var xrot1 = [-1., -1., 1., 1., -1., -1., 1., 1.];
var yrot1 = [-1., 1., 1., -1., -1., 1., 1., -1.];
var zrot1 = [-1., -1., -1., -1., 1., 1., 1., 1.];

var cubeRotation;
var layout = {
  scene:{
	 aspectmode: "manual",
   aspectratio: {
     x: 1, y: 1, z: 1,
    },
   xaxis: {
    range: [-3, 3],
  },
   yaxis: {
    range: [-3, 3],
  },
   zaxis: {
   range: [-3, 3],
  }},
    margin:  {l: 0, r:0,t:0,b:0}
};


$(document).ready(main);

Plotly.newPlot('graph', initial, layout )
