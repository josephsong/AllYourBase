<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Rotator example | jQuery | All Your Base</title>

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
	@import url(/examples/css/ayb.css);
	
	#rotator {position:relative;width:400px;height:300px;}
	.rotator-panel {position:absolute;top:0;left:0;width:400px;height:300px;}
	.panel-position {position:relative;width:400px;height:300px;}
	.rotator-img {}
	.rotator-img img {}
	.rotator-txt {position:absolute;top:0;left:0;padding:5px;}
	.rotator-txt h2 {color:#fff;text-transform:uppercase;font-size:300%;margin:0;line-height:1;}
	.rotator-txt p {color:#fff;margin:0;line-height:1;}
	.rotator-txt a {color:#fff;}
	.rotator-nav {position:absolute;bottom:0;right:20px;}
	.rotator-nav a {display:block;width:20px;height:20px;background-color:#39F;}
	.rotator-nav a:hover {cursor:pointer;}
	.rotator-nav a:hover, .rotator-nav a.active {background-color:#ff9900;}
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
		?>
		
		<div id="rotator">
			<?php for($i = 0; $i < count($nodes); $i++) { ?>
			<div class="rotator-panel clearcontents">
				<div class="panel-position">
					<div class="rotator-img">
						<img src="../../images/<?php echo $nodes[$i]['src']; ?>" width="<?php echo $nodes[$i]['width']; ?>" height="<?php echo $nodes[$i]['height']; ?>" alt="<?php echo $nodes[$i]['title']; ?>" />
					</div>
					<div class="rotator-txt">
						<h2><?php echo $nodes[$i]['title']; ?></h2>
						<p><?php echo $nodes[$i]['desc']; ?> <a href="<?php echo $nodes[$i]['href']; ?>"><?php echo $nodes[$i]['link']; ?></a></p>
					</div>
				</div>
			</div>
			<?php } ?>
		</div>

	</div>
	
	<div id="footer">
		<a href="/">Back</a>
	</div>

<!-- LOAD PAGE SCRIPTS -->
<script src="/js/jQuery/1.4.2/AllYourBase/ui/Rotator.js"></script>

</body>
</html>
