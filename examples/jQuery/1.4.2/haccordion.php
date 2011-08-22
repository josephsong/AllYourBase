<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Haccordion example | jQuery | All Your Base</title>

<!-- LOAD JQUERY FROM GOOGLE CDN -->
<script src="http://www.google.com/jsapi"></script>
<script>
  google.load("jquery", "1.4.2");
  google.load("jqueryui", "1.8.2");
</script>

<!-- PAGE STARTUP -->
<script src="/js/namespace.js"></script>
<script src="/js/jQuery/1.4.2/startup.js"></script>

<style type="text/css">
	@import url(/css/allyourbase.css);
	@import url(/css/forms.css);
	@import url(/examples/css/ayb.css);
		
	#haccordion {width:100%;height:300px;overflow:hidden;margin:0 auto;/*border:1px solid #333;*/}
	
	ul#haccordion-container {width:101%;margin:0 auto;}
	ul#haccordion-container li.haccordion-item {float:left;}
	/*ul#haccordion-container li.last {}*/
	#haccordion-container a {text-decoration:none;}
	div.haccordion-panel {overflow:hidden;/*border-right:1px solid #333;*/}
	ul#haccordion-container li.last div.haccordion-panel {border-right:none;}
	a.haccordion-button {display:block;height:300px;background-color:#CCC;position:relative;}
	div.haccordion-info {position:absolute;bottom:0;width:100%;height:300px;background:transparent url(../../images/info-panel.png) 0 0 repeat;}
	div.haccordion-info div {padding:3%;color:#FFF;}
	
	div.haccordion-panel img {position:absolute;left:-50%;}
	div.haccordion-panel img {display:block;margin:auto;}
	
	div.haccordion-info div.big-headline {padding:0;position:absolute;bottom:0;width:100%;}
	div.big-headline h3 {text-transform:uppercase;font-size:301%;line-height:.8;margin:0;}
	
</style>

</head>

<body class="center nojs">
	<div id="page">
		
		<?php
			$nodes = array();
			$nodes[] = 	array("src" => "P8060985.jpg", "width" => 400, "height" => 300, "title" => "Lorem Ipsum. Dolor Sit Amet.", "desc" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu sem ac dolor pellentesque posuere.", "href" => "http://google.com", "link" => "Donec ligula mi &raquo;");
			$nodes[] = 	array("src" => "P8060986.jpg", "width" => 400, "height" => 300, "title" => "Porta Vitae Rutrum.", "desc" => "Duis pretium dapibus quam. Donec ligula mi, porta vitae rutrum ut, vehicula vestibulum velit.", "href" => "http://google.com", "link" => "Fusce eu sem ac dolor &raquo;");
			$nodes[] = 	array("src" => "P8060989.jpg", "width" => 400, "height" => 300, "title" => "Venat! non Vehicul.", "desc" => "Aliquam dui erat, venenatis non vehicula quis, gravida vel enim.", "href" => "http://google.com", "link" => "Vivamus augue nibh &raquo;");
			$nodes[] = 	array("src" => "P8060991.jpg", "width" => 400, "height" => 300, "title" => "Feugiat id Nibh. Nulla Facilisi.", "desc" => "Vivamus augue nibh, fringilla vitae commodo consequat, feugiat id nibh. Nulla facilisi. Quisque vel odio.", "href" => "http://google.com", "link" => "Aliquam dui erat &raquo;");	
		
			$nodeCount = count($nodes);
			$nodeWidth = 100 / $nodeCount;
		?>
		
		<div id="haccordion">
			<ul id="haccordion-container" class="clearcontents">
			
				<?php for($i = 0; $i < $nodeCount; $i++) { ?>
				
				<li class="haccordion-item <?php if($i == $nodeCount-1) { echo 'last'; } ?>" style="width:<?php echo $nodeWidth; ?>%;">
					<div class="haccordion-panel"><a class="haccordion-button" target="_blank" href="<?php echo $nodes[$i]['href']; ?>">
						<img src="../../images/<?php echo $nodes[$i]['src']; ?>" width="<?php echo $nodes[$i]['width']; ?>" height="<?php echo $nodes[$i]['height']; ?>" alt="<?php echo $nodes[$i]['title']; ?>" />
						<div class="haccordion-info">
							<!--div>
								<h3><?php echo $nodes[$i]['title']; ?></h3>
								<p><?php echo $nodes[$i]['desc']; ?></p>
								<p><?php echo $nodes[$i]['link']; ?></p>
							</div-->
							<div class="big-headline">
								<h3><?php echo $nodes[$i]['title']; ?></h3>
							</div>
						</div>
					</a></div>
				</li>
				
				<?php } ?>
				
			</ul>
		</div>

	</div>
	
	<div id="footer">
		<a href="/">Back</a>
	</div>

<!-- LOAD PAGE SCRIPTS -->
<script src="/js/jQuery/1.4.2/AllYourBase/ui/Haccordion.js"></script>

</body>
</html>
