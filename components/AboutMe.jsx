import React from "react"

export default class AboutMe extends React.Component {
	render() {
		return <div>
  		<a className="clickable" onClick={() => this.props.setAbout()}>back home</a>
  		<br />
  			<h4>what's this site all about?</h4>
  			footballsxs compares a teams result's throughout two seasons, fixture by fixture. 
  			want to know where mourinho's chelsea dropped points on his last season in charge compared
  			to their title-winning season the year before? want to see how tuchel's dortmund has been doing against 
  			klopp's? want to see real madrid's performance in la liga under zidane, benitez, and mourinho, match by 
  			match?
  			<br />
  			<br />
  			this developed out of a series of posts on the liverpoolfc subreddit 
  			by <a href="https://www.reddit.com/user/indian_suzuki" target="_blank">/u/indian_suzuki</a> who had the original idea for the 
  			table and maintained it by hand. when users in the comments asked about other teams in the EPL and other
  			seasons, I decided to build this site!
  			<br />
  			<br />
  			<h4>I can't find any data!</h4>
  			footballsxs is driven by 
  			the <a href="https://github.com/openfootball" target="_blank">openfootball</a> project 
  			and is built dynamically based on what data is present. 
  			As of writing this, the countries with league data are:
  			<ul>
  				<br />
  				<li>England</li>
  				<li>Austria</li>
  				<li>Germany</li>
  				<li>Russia</li>
  				<li>France</li>
  				<li>Spain</li>
  				<li>Italy</li>
  			</ul>
  			if you would like a country or league displayed, please consider contributing to 
  			the <a href="https://github.com/openfootball" target="_blank">openfootball</a> project.
  			<br />
  			<br />
  			<h4>I would like to contribute but don't know how! that page you keep linking to is weird and daunting and
  			I don't know how to program</h4>
  			here's a 
  			quick <a href="https://groups.google.com/forum/#!msg/opensport/YQO5jgeAhWk/-aOB9n8FBQAJ;context-place=forum/opensport"
  			target="_blank">rundown</a> by one of the maintainers of openfootball on how to contribute:
  			<br />
  			<br />
  			"...if you're interested (and you're more than welcome) then you 
			update the plain text file e.g. 
			openfootball/eng-england/2016-17/1-premierleague-i.txt [1] it reads: 
			<br />
			<br />
			Matchday 5
			<br />
			[Sun Sept/18]
			<br /> 
			  Watford FC Manchester United
			  <br /> 
			  Crystal Palace Stoke City 
			  <br />
			  Southampton FC Swansea City 
			  <br />
			  Tottenham Hotspur Sunderland AFC 
			  <br />
			  ... 
			<br />
			    It's all on GitHub - it works kind-of like a wiki. First you need 
			a GitHub Account and for the first edits you will have to manage to 
			send a pull request (e.g. fork the /eng-england repo and than 
			change/update the text file and then go to the pull request tab and 
			send your changes along). 
			<br />
			    Once you're 'established' you will get full access to the repo by 
			joining the github org (if you're interested) and than you can edit in 
			the browser (really like a wiki) and just commit/save or use the 
			'offline' git machinery etc."
			<br />
			<br />
			if you're still lost feel free to ask 
			the <a href="https://groups.google.com/forum/#!forum/opensport" target="_blank">opensport</a> google group or send me 
			an <a href="mailto:info@footballsxs.com">email</a>
			<br />
			<br />
  			<h4>why don't you use the opta, prozone, football-data, etc. API instead?</h4>
  			I love 
  			the <a href="https://groups.google.com/forum/#!forum/opensport" target="_blank">opensport</a> project 
  			and believe that it has the potential to the definitive crowd-sourced sports 
  			dataset online. The fact that it's free, open-source, and almost infinitely extensible (anyone want to 
  			contribute Kyrgyz lower league data from the 90's?) are the reasons I chose openfootball to drive footballsxs.
  			That and, while building this website I started contributing myself some!
  			<br />
  			<br />
  			<h4>I have a suggestion for/I found a bug in the site!</h4>
  			thanks, much appreciated! send me an <a href="mailto:info@footballsxs.com"> email</a> and I'll look into it. 
  			If it's particularly ambitious I might not have time though. you're always welcome to contribute to 
  			the <a href="https://github.com/slaponicus/footballsxs" target="_blank">footballsxs github repo</a> or download and build your own version of the site. If you go down this path, feel free to contact 
  			me with any questions you may have!
  			<br />
  			if you do contribute to the repo, I'll check out your pull request and if it looks good, merge it and put it 
  			online.
  			<br />
  			<br />
  			<h4>who are you?</h4>
  			my name is mike and I'm a liverpool fan from and still currently in austin, tx! 
  			<br />
  			feel free to send me an <a href="mailto:info@footballsxs.com"> email</a> and visit 
  			my <a href="http://slaponic.us" target="_blank">personal website</a> to 
  			check out my other sites, music, and art. 
  			<br />
  			I'm out of work right now, so you can always donate too (and if you do - thank you!!!)
  			<br />
  			<br />
  			<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
				<input type="hidden" name="cmd" value="_s-xclick" />
				<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
				" />
				<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
				<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
			</form>
			<br />
  			<br />
  		</div>
	}
}