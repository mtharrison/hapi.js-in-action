PROGRAM=./node_modules/lab/node_modules/eslint/bin/eslint.js
CONFIG=./node_modules/lab/lib/linters/eslint/.eslintrc
IGNORE=**/node_modules
CMD=$(PROGRAM) -c $(CONFIG) --ignore-pattern $(IGNORE)
lint:
	$(CMD) .
ch1:
	$(CMD) CH01\ -\ Introducing\ hapi/ 
ch2:
	$(CMD) CH02\ -\ Building\ an\ API/ 
ch3:
	$(CMD) CH03\ -\ Building\ a\ Website/ 
ch4:
	$(CMD) CH04\ -\ Routes\ and\ Handlers\ in\ Depth/ 
ch6:
	$(CMD) CH06\ -\ Validation\ with\ Joi/ 
ch8:
	$(CMD) CH08\ -\ Leveraging\ Caching/ 