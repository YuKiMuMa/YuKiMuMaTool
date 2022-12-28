
function createUI(thisObj) {
    
    var activeItem = app.project.activeItem;
    var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "YuKiMuMa Tool",  [ 0, 0, 100,100 ] );
    win.minimumSize.height = 100;
    win.minimumSize.width = 100;
    var winTop      = win.bounds.top;
    var winBottom = win.bounds.bottom;
    var winLeft      = win.bounds.left;
    var winRight    = win.bounds.right;
    
    var MoTileButton = win.add("button", [0 , 0 , 100 , 20 ] , "Motion Tile" );

    var timeButton = win.add("button", [0 , 20 , 100 , 40 ] , "Comp Clop" );

    var Square_S = win.add("button", [0 , 40 , 20 , 60 ] , "□" );

    var Square_F = win.add("button", [20 , 40 , 40 , 60 ] , "■" );

	var Ellipse_S = win.add("button", [40 , 40 , 60 , 60 ] , "〇" );
	
    var Ellipse_F = win.add("button", [60 , 40 , 80 , 60 ] , "●" );
    
    var Path_S = win.add("button", [0 , 60 , 20 , 80 ] , "-" );

    var Path_leng = win.add("edittext", [20, 60, 60, 80], "1920" );

    var PIXCEL = win.add("statictext", [60 , 60 , 110 , 80 ] , "PIXCEL" );

	var start = win.add("button", [0 , 80 , 50 , 100 ] , "START" );

    var end = win.add("button", [50 , 80 , 100 , 100 ] , "END" );
    
    //var FPS = win.add("button", [50 , 140 , 100 , 160 ] , "FPS" );
    var sc = win.add("statictext", [0, 140, 50, 160] , "Seq FPS" );
	

	var strfrm = win.add("edittext", [0, 100, 40, 120], "0" );
	win.add("statictext", [40, 100, 60, 120], "~" );
	var endfrm = win.add("edittext", [60, 100, 100, 120], "0" );
	var frResult = win.add("edittext", [0, 120,50, 140], "0" );
    win.add("statictext", [50, 120, 100, 140], "FRAMES" );
    var fpsnum = win.add("dropdownlist", [50 , 140 , 100 , 160 ] , ["12","15","24","25","30","60","120"] );
    fpsnum.selection = 4;
    app.preferences.savePrefAsFloat("Import Options Preference Section","Import Options Default Sequence FPS",fpsnum.selection.text,PREFType.PREF_Type_MACHINE_INDEPENDENT);
    app.preferences.saveToDisk()


    MoTileButton.onClick = function(){ 
        lay = app.project.activeItem.selectedLayers;
        for (i=0; i<lay.length; i++){
            layObj = lay[i]
            layObj("ADBE Effect Parade").addProperty("ADBE Tile");
            layObj("ADBE Effect Parade")("ADBE Tile")["ADBE Tile-0004"].setValue(200);
            layObj("ADBE Effect Parade")("ADBE Tile")["ADBE Tile-0005"].setValue(200);
            layObj("ADBE Effect Parade")("ADBE Tile")["ADBE Tile-0006"].setValue(true);
        }
    }
                

    timeButton.onClick = function(){
        var selectComp = app.project.activeItem;  
        selectComp.duration = app.project.activeItem.time;
    }

    Square_S.onClick = function(){
        var comp = app.project.activeItem;
        var newLayers = new Array();
        var selectedLayers= new Array();
        var tempLength, i, j;
        tempLength = comp.selectedLayers.length;

            if (tempLength >0){
                for(i=0; i < tempLength; i++){
                    selectedLayers[i] = comp.selectedLayers[i];
                }
                    for (j=0; j < tempLength; j++) {

                    newLayers[j] = comp.layers.addShape();
                    newLayers[j].startTime = comp.time;
                    newLayers[j].outPoint = comp.time+1.0;
                    newLayers[j].moveBefore(selectedLayers[j]);
                    var shapeProperty = newLayers[j].property('ADBE Root Vectors Group');
                    var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Rect');
                    myShapePath.size.expression="temp = effect(\"Width\")(1);temp2 = effect(\"Hight\")(1);[temp, temp2]";
                    var myShapePath2 = shapeProperty.addProperty('ADBE Vector Graphic - Stroke');
                    myShapePath2.strokeWidth.expression="effect(\"Stroke Width\")(1)";
                    
                    var myeffect = newLayers[j]("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    myeffect["ADBE Slider Control-0001"].setValue(2);
                    myeffect.name="Stroke Width";
                    var myeffect2 = newLayers[j]("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    myeffect2["ADBE Slider Control-0001"].setValue(100);
                    myeffect2.name="Width";
                    var myeffect3 = newLayers[j]("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    myeffect3["ADBE Slider Control-0001"].setValue(100);
                    myeffect3.name="Hight";
                    }

            }
            else{
                var myShapeLayer = comp.layers.addShape();
                myShapeLayer.startTime = comp.time;
                myShapeLayer.outPoint = comp.time+1.0;
                var shapeProperty = myShapeLayer.property('ADBE Root Vectors Group');
                var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Rect');
                myShapePath.size.expression="temp = effect(\"Width\")(1);temp2 = effect(\"Hight\")(1);[temp, temp2]";
                var myShapePath2 = shapeProperty.addProperty('ADBE Vector Graphic - Stroke');
                myShapePath2.strokeWidth.expression="effect(\"Stroke Width\")(1)";

                var myeffect = myShapeLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                myeffect["ADBE Slider Control-0001"].setValue(2);
                myeffect.name="Stroke Width";
                var myeffect2 = myShapeLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                myeffect2["ADBE Slider Control-0001"].setValue(100);
                myeffect2.name="Width";
                var myeffect3 = myShapeLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                myeffect3["ADBE Slider Control-0001"].setValue(100);
                myeffect3.name="Hight";
            }
        
    }



    Square_F.onClick = function(){
        var comp = app.project.activeItem;
        var newLayers = new Array();
        var selectedLayers= new Array();
        var tempLength, i, j;
        tempLength = comp.selectedLayers.length;

            if (tempLength >0){
                for(i=0; i < tempLength; i++){
                    selectedLayers[i] = comp.selectedLayers[i];
                }
                    for (j=0; j < tempLength; j++) {

                    newLayers[j] = comp.layers.addShape();
                    newLayers[j].startTime = comp.time;
                    newLayers[j].outPoint = comp.time+1.0;
                    newLayers[j].moveBefore(selectedLayers[j]);

                    var shapeProperty = newLayers[j].property('ADBE Root Vectors Group');
                    var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Rect');
                    myShapePath.size.expression="temp = effect(\"Width\")(1);temp2 = effect(\"Hight\")(1);[temp, temp2]";
                    var myShapePath2 = shapeProperty.addProperty('ADBE Vector Graphic - Fill');
                    
                    var myeffect2 = newLayers[j]("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    myeffect2["ADBE Slider Control-0001"].setValue(100);
                    myeffect2.name="Width";
                    var myeffect3 = newLayers[j]("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    myeffect3["ADBE Slider Control-0001"].setValue(100);
                    myeffect3.name="Hight";
                    }

            }
            else{
                var myShapeLayer = comp.layers.addShape();
                myShapeLayer.startTime = comp.time;
                myShapeLayer.outPoint = comp.time+1.0;
                var shapeProperty = myShapeLayer.property('ADBE Root Vectors Group');
                var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Rect');
                myShapePath.size.expression="temp = effect(\"Width\")(1);temp2 = effect(\"Hight\")(1);[temp, temp2]";
                var myShapePath2 = shapeProperty.addProperty('ADBE Vector Graphic - Fill');

                var myeffect2 = myShapeLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                myeffect2["ADBE Slider Control-0001"].setValue(100);
                myeffect2.name="Width";
                var myeffect3 = myShapeLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                myeffect3["ADBE Slider Control-0001"].setValue(100);
                myeffect3.name="Hight";
            }
    }

	Ellipse_S.onClick = function(){

        var comp = app.project.activeItem;
        var newLayers = new Array();
        var selectedLayers= new Array();
        var tempLength, i, j;
        tempLength = comp.selectedLayers.length;

            if (tempLength >0){
                for(i=0; i < tempLength; i++){
                    selectedLayers[i] = comp.selectedLayers[i];
                }
                    for (j=0; j < tempLength; j++) {

                    newLayers[j] = comp.layers.addShape();
                    newLayers[j].startTime = comp.time;
                    newLayers[j].outPoint = comp.time+1.0;
                    newLayers[j].moveBefore(selectedLayers[j]);
                    var shapeProperty = newLayers[j].property('ADBE Root Vectors Group');
                    var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Ellipse');
                    myShapePath.size.expression="temp = effect(\"Diameter\")(1);[temp, temp]";
                    var myShapePath2 = shapeProperty.addProperty('ADBE Vector Graphic - Stroke');
                    myShapePath2.strokeWidth.expression="effect(\"Stroke Width\")(1)";

                    var myeffect = newLayers[j]("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    myeffect["ADBE Slider Control-0001"].setValue(2);
                    myeffect.name="Stroke Width";
                    var myeffect2 = newLayers[j]("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    myeffect2["ADBE Slider Control-0001"].setValue(100);
                    myeffect2.name="Diameter";
                    }

            }
            else{
                var myShapeLayer = comp.layers.addShape();
                myShapeLayer.startTime = comp.time;
                myShapeLayer.outPoint = comp.time+1.0;
                var shapeProperty = myShapeLayer.property('ADBE Root Vectors Group');
                var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Ellipse');
                myShapePath.size.expression="temp = effect(\"Diameter\")(1);[temp, temp]";
                var myShapePath2 = shapeProperty.addProperty('ADBE Vector Graphic - Stroke');
                myShapePath2.strokeWidth.expression="effect(\"Stroke Width\")(1)";

                var myeffect = myShapeLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                myeffect["ADBE Slider Control-0001"].setValue(2);
                myeffect.name="Stroke Width";
                var myeffect2 = myShapeLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                myeffect2["ADBE Slider Control-0001"].setValue(100);
                myeffect2.name="Diameter";

            }
        
	}

	Ellipse_F.onClick = function(){
        var comp = app.project.activeItem;
        var newLayers = new Array();
        var selectedLayers= new Array();
        var tempLength, i, j;
        tempLength = comp.selectedLayers.length;

            if (tempLength >0){
                for(i=0; i < tempLength; i++){
                    selectedLayers[i] = comp.selectedLayers[i];
                }
                    for (j=0; j < tempLength; j++) {

                    newLayers[j] = comp.layers.addShape();
                    newLayers[j].startTime = comp.time;
                    newLayers[j].outPoint = comp.time+1.0;
                    newLayers[j].moveBefore(selectedLayers[j]);
                    var shapeProperty = newLayers[j].property('ADBE Root Vectors Group');
                    var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Ellipse');
                    myShapePath.size.expression="temp = effect(\"Diameter\")(1);[temp, temp]";
                    var myShapePath2 = shapeProperty.addProperty('ADBE Vector Graphic - Fill');

                    var myeffect2 = newLayers[j]("ADBE Effect Parade").addProperty("ADBE Slider Control");
                    myeffect2["ADBE Slider Control-0001"].setValue(100);
                    myeffect2.name="Diameter";
                    }

            }
            else{
                var myShapeLayer = comp.layers.addShape();
                myShapeLayer.startTime = comp.time;
                myShapeLayer.outPoint = comp.time+1.0;
                var shapeProperty = myShapeLayer.property('ADBE Root Vectors Group');
                var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Ellipse');
                myShapePath.size.expression="temp = effect(\"Diameter\")(1);[temp, temp]";
                var myShapePath2 = shapeProperty.addProperty('ADBE Vector Graphic - Fill');

                var myeffect2 = myShapeLayer("ADBE Effect Parade").addProperty("ADBE Slider Control");
                myeffect2["ADBE Slider Control-0001"].setValue(100);
                myeffect2.name="Diameter";

            }
    }


    Path_S.onClick = function(){

        var comp = app.project.activeItem;
        var newLayers = new Array();
        var selectedLayers= new Array();
        var tempLength, i, j;
        tempLength = comp.selectedLayers.length;

            if (tempLength >0){
                for(i=0; i < tempLength; i++){
                    selectedLayers[i] = comp.selectedLayers[i];
                }
                    for (j=0; j < tempLength; j++) {

                    newLayers[j] = comp.layers.addShape();
                    newLayers[j].startTime = comp.time;
                    newLayers[j].outPoint = comp.time+1.0;
                    newLayers[j].moveBefore(selectedLayers[j]);
                    var shapeProperty = newLayers[j].property('ADBE Root Vectors Group');
                    var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Group');
                    
                    var myShape = new Shape()
                    myShape.vertices = [ [-Path_leng.text/2,0], [Path_leng.text/2,0] ];
                    myShapePath(2).setValue(myShape);
                    var myShapePath = shapeProperty.addProperty('ADBE Vector Graphic - Stroke');
                    }

            }
            else{
                var myShapeLayer = comp.layers.addShape();
                myShapeLayer.startTime = comp.time;
                myShapeLayer.outPoint = comp.time+1.0;
                var shapeProperty = myShapeLayer.property('ADBE Root Vectors Group');
                var myShapePath = shapeProperty.addProperty('ADBE Vector Shape - Group');

                var myShape = new Shape()
                myShape.vertices = [ [-Path_leng.text/2,0], [Path_leng.text/2,0] ];
                myShapePath(2).setValue(myShape);
                var myShapePath = shapeProperty.addProperty('ADBE Vector Graphic - Stroke');
            }
        
	}
    


	var sf=0,ef=0;
	
	frameget = function(){
		var compItem = app.project.activeItem;
		var nowfrm;

		if(timeToCurrentFormat(compItem.time, compItem.frameRate, false).indexOf(":")<0){
			nowfrm = timeToCurrentFormat(compItem.time, compItem.frameRate, false);
		}
		else{
			app.project.timeDisplayType = TimeDisplayType.FRAMES;
			nowfrm = timeToCurrentFormat(compItem.time, compItem.frameRate, false);
			app.project.timeDisplayType = TimeDisplayType.TIMECODE;

		}
		return nowfrm;

	}

	frmresult = function(){
		frResult.text = ef-sf;
	}

    start.onClick = function(){
		sf = frameget();
		strfrm.text = sf;
		frmresult();
	}
	
	end.onClick = function(){
		ef = frameget();
		endfrm.text = ef;
		frmresult();
    }

    fpsnum.onChange = function(){



        app.preferences.savePrefAsFloat("Import Options Preference Section","Import Options Default Sequence FPS",fpsnum.selection.text,PREFType.PREF_Type_MACHINE_INDEPENDENT);
        app.preferences.saveToDisk()
              
        alert(n_fps);
              

        
          
    }
            

}
createUI(this);
